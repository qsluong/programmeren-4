package com.example.quocsyluong.volleyapp.adapter;

import android.util.Log;

import com.example.quocsyluong.volleyapp.domain.City;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class CityMapper {
	
	private static final String RESULT = "result";
	private static final String CITY_NAME = "Name";
	private static final String CITY_COUNTRYCODE = "CountryCode";
	private static final String CITY_DISTRICT = "District";
	private static final String CITY_POPULATION = "Population";
	
	public static ArrayList<City> mapCityList(JSONObject response){
		
		ArrayList<City> result = new ArrayList<>();
		try{
			JSONArray jsonArray = response.getJSONArray(RESULT);
			
			for(int i = 0; i < jsonArray.length(); i++){
				JSONObject jsonProduct = jsonArray.getJSONObject(i);
				
				City city = new City();
				String cityName = jsonProduct.getString(CITY_NAME);
				String cityCountryCode = jsonProduct.getString(CITY_COUNTRYCODE);
				String cityDistrict = jsonProduct.getString(CITY_DISTRICT);
				int cityPopulation = jsonProduct.getInt(CITY_POPULATION);
				
				city.setName(cityName);
				city.setCountryCode(cityCountryCode);
				city.setDistrict(cityDistrict);
				city.setPopulation(cityPopulation);
				
				result.add(city);
			}
		} catch( JSONException ex) {
			Log.e("FilmMapper", "mapFilmList JSONException " + ex.getLocalizedMessage());
		}
		return result;
	}
}
