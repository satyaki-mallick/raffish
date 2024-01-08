from datetime import datetime
import math
import pandas as pd

class Percolate:
    
    def __init__(self, selection: pd.Series):
        self.id = selection["ID"]
        # campaign specific
        self.title = selection["Campaign Title|||ignore"]
        self.desc = selection["Campaign Description|||ignore"]
        startdate = selection["Campaign Start Date|||ignore"]
        self.startdate_unix = int(startdate.timestamp() * 1000)
        enddate = selection["Campaign End Date|||ignore"]
        self.enddate_unix = int(enddate.timestamp() * 1000)
        self.status_ = "DRAFT";
        self.audience = selection["Audience|||schema:1383551219579469649"]
        self.brand = selection["Brand|||schema:1383551219579469649"]

        # tags
        self.channel = selection["Channel|||schema:1383551219579469649"] # fb or insta or email
        self.country = selection["Country|||schema:1383551219579469649"]
        self.region = selection["Region|||schema:1383551219579469649"]
        self.year = startdate.year
        self.quarter = math.ceil(startdate.month/3.)
        self.type = selection["Campaign Type|||schema:1383551219579469649"] # fb or insta
        self.objective = selection["Primary Objective|||schema:1383551219579469649"]

        # campaign brief
        self.brief_description = selection["Section Marketing Overview - Risks & Constraints|||ignore"]
        self.brief_creative_dirc_tov = selection["Section Marketing Overview - What do we want the audience to think, feel and do?|||ignore"]

        # Before pushing, add if ({___} !== undefined)

        # sub-campaign
        self.stay_or_booking = selection["Booking or Stay|||schema:1383551219579469649"];

