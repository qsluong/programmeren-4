package com.example.quocsyluong.volleyapp.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.quocsyluong.volleyapp.R;
import com.example.quocsyluong.volleyapp.domain.City;

import java.util.ArrayList;

public class CityAdapter extends BaseAdapter  {
	
	private final String TAG = "CityAdapter";
	
	private Context mContext;
	private LayoutInflater mInflater;
	private ArrayList<City> cities;
	
	public CityAdapter(Context context, LayoutInflater layoutInflater, ArrayList<City> cities) {
		this.mContext = context;
		this.mInflater = layoutInflater;
		this.cities = cities;
	}
	
	@Override
	public int getCount() {
		return cities.size();
	}
	
	@Override
	public Object getItem(int position) {
		Log.i(TAG, "getItem() at " + position);
		return cities.get(position);
	}
	
	@Override
	public long getItemId(int position) {
		return position;
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		Log.i(TAG, "getView at " + position);
		ViewHolder viewHolder;
		if(convertView == null) {
			
			Log.i(TAG, "convertview is NULL - nieuwe maken");
			convertView = mInflater.inflate(R.layout.city_listview_row, null);
			
			viewHolder = new ViewHolder();
			viewHolder.cityNameView = (TextView) convertView.findViewById(R.id.CityNameListViewTv);
			viewHolder.cityCountryCodeView = (TextView) convertView.findViewById(R.id.CityCountryCodeListViewTv);
			
			convertView.setTag(viewHolder);
		} else {
			Log.i(TAG, "convertView bestond al - hergebruik");
			viewHolder = (ViewHolder) convertView.getTag();
		}
		
		City city = cities.get(position);
		
		String cityName = city.getName();
		String cityCountryCode = city.getCountryCode();
		
		viewHolder.cityNameView.setText(cityName);
		viewHolder.cityCountryCodeView.setText(cityCountryCode);
		
		return convertView;
	}
	
	private static class ViewHolder {
		TextView cityNameView;
		TextView cityCountryCodeView;
	}
}
