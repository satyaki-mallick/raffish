import pandas as pd
from flask import Flask
from flask import request

import processor

app = Flask(__name__)
# df = pd.read_excel('/home/ec2-user/raffish-all/small_excel_2_row.xlsx')


@app.route("/data",  methods = ['POST'])
def hello_world():
    response = request.json['fe_data']
    
    df = pd.DataFrame(response)
    response_msg = processor.process_dataframe(df)
    return response_msg


