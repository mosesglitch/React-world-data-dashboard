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

@app.route("/bubble",methods=["GET"])
def factors_of_production():
    dfecon=pd.read_csv("Size_of_the_economy.csv")
    economic_size={"Country":dfecon["Country"].to_list(),
    "density":dfecon["Population density people per sq. km(2021)"].to_list(),
    "population":dfecon["Population millions (2021)"].to_list(),
    "surfaceArea":dfecon["Surface area sq. km thousands (2018)"].to_list(),
    "GNIPerCapita":dfecon["Gross national income per capita, Atlas method"].to_list(),
    "PPPGNIperCapita":dfecon["Purchasing power parity gross national income2021 per capita (2021)"].to_list(),
    "GDPpercapita(%)growth":dfecon["Gross domestic product per capita%growth(2021)"].to_list(),
    }
    return jsonify(economicSize=economic_size)

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

@app.route("/lifeexpectancy",methods=['GET'])
def lifeexpectancy():
    #Get data from React Frontend

    #Read and format data from csv file
    dfle=pd.read_csv("Life-expectancy.csv",header=2)
    meltle=dfle.melt(id_vars=["Country Name","Country Code","Indicator Name","Indicator Code"],
         var_name="Year",
         value_name="Life Expectancy")
    dflifeexpectancy=meltle.loc[meltle["Country Name"].isin(["Kenya"])]
    life_dict={ 'Yearle':dflifeexpectancy['Year'].to_list(),
                'LifeExp':dflifeexpectancy['Life Expectancy'].to_list()}
    print("life dict",life_dict)
    return jsonify(data=life_dict)
@app.route("/gdpcont",methods=['GET'])
def gdpcontrib():
    df=pd.read_csv("GDP-valueadd.csv",header=3)
    df.rename(columns={"Unnamed: 0":"country"},inplace=True)
    dfcontrib=df[['country','Agriculture(2020)','Industry(2020)','Manufacturing(2020)','Services(2020)']]
    dfcontrib=dfcontrib[dfcontrib['country']=='Kenya']
    gdp_dict={
        'cols':dfcontrib.columns.to_list()[1:],
        'contrib':dfcontrib.iloc[0].to_list()[1:]
    }
    
    return jsonify(gdp_contrib=gdp_dict)
if __name__=="__main__":
    app.run(debug=True)