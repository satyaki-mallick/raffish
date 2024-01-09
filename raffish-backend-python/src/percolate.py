from datetime import datetime
import math
import pandas as pd
import logging

class Percolate:
    
    def __init__(self, selection: pd.Series):
        self.id = selection["ID"]
        # campaign specific
        try:
            self.title = selection["Campaign Title|||ignore"]
        except KeyError:
            self.title = ""
        try:
            self.desc = selection["Campaign Description|||ignore"]
            if pd.isna(self.desc):
                self.desc = ""
        except KeyError:
            self.desc = ""
        startdate = selection["Campaign Start Date|||ignore"]
        startdate = datetime.strptime(startdate, "%m/%d/%Y")
        self.startdate_unix = int(startdate.timestamp() * 1000)

        enddate = selection["Campaign End Date|||ignore"]
        enddate = datetime.strptime(enddate, "%m/%d/%Y")
        self.enddate_unix = int(enddate.timestamp() * 1000)

        self.status_ = "DRAFT";
        self.audience = selection["Audience|||schema:1383551219579469649"] #B2B or B2C or others

        # custom_fields"
        self.brand = selection["Brand|||schema:1383551219579469649"]
        self.channel = selection["Channel|||schema:1383551219579469649"] # fb or insta or email

        # tags
        try:
            self.country = selection["Country|||schema:1383551219579469649"]
        except KeyError:
            self.country = ""
        try:
            self.region = selection["Region|||schema:1383551219579469649"]
        except KeyError:
            self.region = ""
        self.year = startdate.year
        self.quarter = "Q" + str(math.ceil(startdate.month/3.))

        try:
            self.type = selection["Campaign Type|||schema:1383551219579469649"] # fb or insta
        except KeyError:
            self.type
        try:
            self.objective = selection["Primary Objective|||schema:1383551219579469649"]
        except KeyError:
            self.objective = ""

        # campaign brief
        try:
            self.brief_description = selection["Section Marketing Overview - Risks & Constraints|||ignore"]
        except KeyError:
            self.brief_description = ""
        try:
            self.brief_creative_dirc_tov = selection["Section Marketing Overview - What do we want the audience to think, feel and do?|||ignore"]
        except KeyError:
            self.brief_creative_dirc_tov = ""

        # sub-campaign
        try:
            self.stay_or_booking = selection["Booking or Stay|||schema:1383551219579469649"];
        except KeyError:
            self.stay_or_booking = ""

