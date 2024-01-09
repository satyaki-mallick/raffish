CREATE_CAMPAIGN_API = "https://api2.sprinklr.com/prod3/api/v2/campaign"
CREATE_CAMPAIGN_BRIEF_API = "https://api2.sprinklr.com/prod3/api/v2/{campaign_id}/brief"

TOKEN = "GPNjy6p150+lPLvdi3HHmyLJlVwfcbd1c92lTtwTxTthNjRlMjBiZi1kYzc2LTM4YzEtYjFjZC0yZTBjNzgxZjI1ZWE="
APP_KEY = "ugu4863nf94nx8va75ges4ps"

HEADERS = {
            "Content-Type": "application/json",
            "Authorization":
            f"Bearer {TOKEN}",
            "Key": APP_KEY,
        }

strings_to_remove = [
            "-",
            "Booking Period","Book period",
            "Stay Period","Stay period","STAY",
            "2019","2020","2021","2022","2023",
            "Q1","Q2","Q3","Q4",
            "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
            "TEST", "Test"
        ]