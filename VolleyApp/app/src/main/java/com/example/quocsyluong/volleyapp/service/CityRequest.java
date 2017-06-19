package com.example.quocsyluong.volleyapp.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONObject;

public class CityRequest {
	private Context context;
	private final String TAG = "CityRequest";
	
	private CityRequestListener listener;
	
	public CityRequest(Context context, CityRequestListener listener) {
		this.context = context;
		this.listener = listener;
	}
	
	public void handleGetCities() {
		final JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
				(Request.Method.GET,
						Config.URL_CITY,
						null,
						new Response.Listener<JSONObject>(){
							@Override
							public void onResponse(JSONObject response) {
								Log.d(TAG, response.toString());
								listener.onSuccessfulGetCities(response);
							}
						}, new Response.ErrorListener() {
					@Override
					public void onErrorResponse(VolleyError error) {
						listener.onErrorGetCities(error);
					}
				});
		jsonObjectRequest.setRetryPolicy(new DefaultRetryPolicy(
				1500,
				2,
				DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
		VolleyRequestQueue.getInstance(context).addToRequestQueue(jsonObjectRequest);
	}
	
	public interface CityRequestListener {
		void onSuccessfulGetCities(JSONObject response);
		
		void onErrorGetCities(VolleyError error);
	}
}