from flask import Flask,jsonify,request
import pandas as pd
import numpy as np

app=Flask(__name__)
@app.route("/chloropleth",methods=["GET"])
def country_chloropleth():

    df2=pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv')

    chloropleth={"country":df2["COUNTRY"].to_list(),
                  "gdp":df2["GDP (BILLIONS)"].to_list(),
                  "code":df2["CODE"].to_list(),}

    return jsonify(chloropleth=chloropleth)

@app.route("/members",methods=['POST'])
def selected():
    #Get data from React Frontend
    body=request.get_json()
    search=body.get("selected_country")

    #Read and format data from csv file
    df=pd.read_csv("gdp_csv.csv")
    select_country=df.loc[df["Country Name"].isin([search])]

    year_dict={'Year':select_country['Year'].to_list(),
                "Value":select_country['Value'].to_list()}

    return jsonify(data=year_dict)

if __name__=="__main__":
    app.run(debug=True)