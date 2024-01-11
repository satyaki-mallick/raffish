from percolate import Percolate
import pandas as pd
import re
import requests
import config
import json

import logging

logging.basicConfig(level=logging.INFO)

class Sprinklr:
    def __init__(self):
        self.created_campaign_dict = {}
        self.success_count = 0
        self.failure_count = 0
    
    def init_with_percolate(self, percolate_obj: Percolate):
        self.percolate_obj = percolate_obj
        self.tags = []
        self.custom_fields = {}
        self.campaign_name = None

    def create_campaign(self):
        self.campaign_name = self.create_campaign_name()
        self.create_tags()
        self.create_custom_fields()
        print(self.created_campaign_dict)
        if self.is_subcampaign():
            payload = self.create_subcampaign_payload()
            print("is subcampaign")
        else:
            payload = self.create_campaign_payload()
            print("is campaign")
        response = self.push_payload(payload)
        self.process_response(response)
    
    def process_response(self, response):
        
        if response.status_code == 200:
            self.success_count += 1
        else:
            self.failure_count += 1

    def create_tags(self):
        tags = []
        if not pd.isna(self.percolate_obj.country) : tags.append("country: " + str(self.percolate_obj.country))
        if not pd.isna(self.percolate_obj.region) : 
            clean_string = re.sub(";;;", ",", str(self.percolate_obj.region))
            tags.append("region: " + clean_string)
        if not pd.isna(self.percolate_obj.year) : tags.append("year: " + str(self.percolate_obj.year))
        if not pd.isna(self.percolate_obj.quarter) : tags.append("quarter: " + str(self.percolate_obj.quarter))
        if not pd.isna(self.percolate_obj.type) : tags.append("type: " + str(self.percolate_obj.type))
        if not pd.isna(self.percolate_obj.objective) : tags.append("objective: " + str(self.percolate_obj.objective))
        self.tags = tags

    def create_custom_fields(self):
        channel = "" if pd.isna(self.percolate_obj.channel) else str(self.percolate_obj.channel)
        channel = re.sub(";;;", ",", channel)
        channel = channel.split(",")
        brand = "" if pd.isna(self.percolate_obj.brand) else str(self.percolate_obj.brand)
        brand = brand.split(",")
        custom_fields = {
            "Channel Type": channel,
            "Brand": brand
        }
        self.custom_fields = custom_fields

    def is_subcampaign(self):
        if self.campaign_stem_text in self.created_campaign_dict:
            return True
        return False

    def create_subcampaign_payload(self):

        payload = {
            "name": self.campaign_name + "_Stay_Period",
            "description": self.percolate_obj.desc,
            "parentCampaignId": self.created_campaign_dict.get(self.campaign_stem_text),
            "startDate": self.percolate_obj.startdate_unix,
            "endDate": self.percolate_obj.enddate_unix,
            "tags": self.tags,
            "status": "DRAFT",
            "partnerCustomFields": self.custom_fields,
        }
        return payload

    def create_campaign_payload(self):
        payload = {
            "name": self.campaign_name,
            "description": "" if pd.isna(self.percolate_obj.desc) else self.percolate_obj.desc,
            "startDate": self.percolate_obj.startdate_unix,
            "endDate": self.percolate_obj.enddate_unix,
            "tags": self.tags,
            "status": "DRAFT",
            "partnerCustomFields": self.custom_fields,
        }
        return payload

    def push_payload(self, payload):
        response = requests.post(config.CREATE_CAMPAIGN_API,
                      data=json.dumps(payload),
                      headers=config.HEADERS)
        
        if response.status_code != 200:
            logging.error(f'Failed Creating Campaign Name: {self.campaign_name}')
            logging.error(response.content)
        else:
            response_dict = json.loads(response.content)
            c_id = response_dict["data"]["id"]
            logging.info(f"Created Campaign: {self.campaign_name} with id: {c_id}")
            self.update_key_dict(c_id)
        return response

    def update_key_dict(self, c_id):
        self.created_campaign_dict[self.campaign_stem_text] = c_id

    def create_brief_background(self, campaign_id):
        url = config.CREATE_CAMPAIGN_BRIEF_API.format(campaign_id = campaign_id)
        self.brief_name = "Background"
        self.brief_file = self.percolate_obj.brief_description

        payload = {}

        response = requests.post(url,
                data=json.dumps(payload),
                headers=config.HEADERS)
        
        if response.status_code != 200:
            logging.error(f'Failed importing Campaign Name: {self.campaign_name}')
            logging.error(response.content)
        else:
            logging.info(f"Brief Background success for {campaign_id}")

    def create_campaign_name(self):
        workfront_no = self.percolate_obj.id.split(":")[1]
        scope = self._parse_scope(self.percolate_obj.audience)
        campaign_text = self._parse_text(self.percolate_obj.title)
        year = self.percolate_obj.year
        self.campaign_stem_text = campaign_text

        return "_".join([workfront_no, scope, campaign_text, str(year)])

    def _parse_scope(self, audience):
        if pd.isna(audience):
            return "B2C"
        audience = audience.strip()
        if audience.startswith("B2C"):
            scope = "B2C"
        elif audience.startswith("B2B"):
            scope = "B2B"
        elif audience.startswith("Internal"):
            scope = "Internal"
        elif audience.startswith("Members"):
            scope = "Members"
        else:
            scope = "B2C"
        return scope

    def _parse_text(self, name):
        strings_to_remove = "|".join(config.strings_to_remove)
        clean_string = re.sub(strings_to_remove, "", name)
        clean_string = clean_string.strip()
        return re.sub("\s", "_", clean_string)
