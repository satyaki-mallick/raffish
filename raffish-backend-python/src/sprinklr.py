from percolate import Percolate
import pandas as pd
import re
import requests
import config
import json

import logging

logging.basicConfig(level=logging.INFO)

class Sprinklr:
    def __init__(self, percolate_obj: Percolate):
        self.percolate_obj = percolate_obj

    def create_campaign(self):
        self.campaign_name = self.create_campaign_name()
        self.create_campaign_payload()
        created_campaign_id = self.push_payload()
        self.create_briefs(created_campaign_id)

    def create_campaign_payload(self):
        self.payload = {
            "name": self.campaign_name + "to",
            "description": self.percolate_obj.desc,
            "startDate": self.percolate_obj.startdate_unix,
            "endDate": self.percolate_obj.enddate_unix,
            "status": "DRAFT",
        }

    def push_payload(self):
        headers = {
            "Content-Type": "application/json",
            "Authorization":
            f"Bearer {config.TOKEN}",
            "Key": config.APP_KEY,
        }
        response = requests.post(config.CREATE_CAMPAIGN_API,
                      data=json.dumps(self.payload),
                      headers=headers)
        
        if response.status_code != 200:
            logging.error(f'Failed importing Campaign Name: {self.campaign_name}')
            logging.error(response.content)
        else:
            response_dict = json.loads(response.content)
            return response_dict["data"]["id"]

    def create_briefs(self, campaign_id):
        url = config.CREATE_CAMPAIGN_BRIEF_API.format(campaign_id = campaign_id)
        print(url)

    def create_campaign_name(self):
        workfront_no = self.percolate_obj.id.split(":")[1]
        scope = self._parse_scope(self.percolate_obj.audience)
        campaign_text = self._parse_text(self.percolate_obj.title)
        year = self.percolate_obj.year

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
        strings_to_remove = [
            "-",
            "Booking Period","Book period",
            "Stay Period","Stay period","STAY",
            "2019","2020","2021","2022","2023",
            "Q1","Q2","Q3","Q4",
            "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
            "TEST", "Test"
        ]
        strings_to_remove = "|".join(strings_to_remove)
        clean_string = re.sub(strings_to_remove, "", name)
        clean_string = clean_string.strip()
        return re.sub("\s", "_", clean_string)
