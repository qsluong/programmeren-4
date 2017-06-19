package com.example.quocsyluong.volleyapp.presentation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.android.volley.VolleyError;
import com.example.quocsyluong.volleyapp.R;
import com.example.quocsyluong.volleyapp.adapter.CityAdapter;
import com.example.quocsyluong.volleyapp.adapter.CityMapper;
import com.example.quocsyluong.volleyapp.domain.City;
import com.example.quocsyluong.volleyapp.service.CityRequest;

import org.json.JSONObject;

import java.util.ArrayList;

public class CityActivity extends AppCompatActivity implements CityRequest.CityRequestListener {
	
	public static final String CITY = "City";
	private final String TAG = "CITYACTIVITY";
	
	private ArrayList<City> cities = new ArrayList<>();
	private CityAdapter cityAdapter;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_city);
		
		cityAdapter = new CityAdapter(getApplicationContext(), getLayoutInflater(), cities);
		ListView lvFilms = (ListView) findViewById(R.id.CityListView);
		lvFilms.setAdapter(cityAdapter);
		lvFilms.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				Intent intent = new Intent(getApplicationContext(), DetailActivity.class);
				intent.putExtra(CITY, cities.get(position));
				startActivity(intent);
			}
		});
		
		CityRequest request = new CityRequest(getApplicationContext(), this);
		request.handleGetCities();
	}
	
	@Override
	public void onSuccessfulGetCities(JSONObject response) {
		Log.i(TAG, "response: " + response);
		for(City city: CityMapper.mapCityList(response)) {
			cities.add(city);
			cityAdapter.notifyDataSetChanged();
		}
	}
	
	@Override
	public void onErrorGetCities(VolleyError error) {
		Log.e(TAG, "onErrorGetCities " + error.toString());
	}
}
