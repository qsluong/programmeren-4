package com.example.quocsyluong.volleyapp.service;

import android.content.Context;
import android.util.Log;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginRequest {
	private Context mContext;
	private final String TAG = this.getClass().getSimpleName();
	
	private LoginListener listener;
	
	public LoginRequest(Context context, LoginListener listener) {
		this.mContext = context;
		this.listener = listener;
	}
	
	public void handleLogin(final String email, final String password) {
		final String body = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
		try {
			final JSONObject jsonBody = new JSONObject(body);
			JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
					(Request.Method.POST,
							Config.URL_LOGIN,
							jsonBody,
							new Response.Listener<JSONObject>() {
								@Override
								public void onResponse(JSONObject response) {
									listener.onSuccessfulLogin(response);
								}
							}, new Response.ErrorListener() {
						@Override
						public void onErrorResponse(VolleyError error) {
							listener.onLoginError(error);
						}
					});
			jsonObjectRequest.setRetryPolicy(new DefaultRetryPolicy(
					1500,
					2,
					DefaultRetryPolicy.DEFAULT_BACKOFF_MULT
			));
			VolleyRequestQueue.getInstance(mContext).addToRequestQueue(jsonObjectRequest);
		} catch (JSONException je) {
			Log.e("THIS", je.getLocalizedMessage());
		}
	}
	
	public void handleRegister(final String email, final String password) {
		final String body = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
		try {
			JSONObject jsonBody = new JSONObject(body);
			JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
					(Request.Method.POST,
							Config.URL_REGISTER,
							jsonBody,
							new Response.Listener<JSONObject>() {
								@Override
								public void onResponse(JSONObject response) {
									listener.onSuccessfulRegister(response);
								}
							}, new Response.ErrorListener() {
						@Override
						public void onErrorResponse(VolleyError error) {
							listener.onRegisterError(error);
						}
					});
			jsonObjectRequest.setRetryPolicy(new DefaultRetryPolicy(
					1500, // SOCKET_TIMEOUT_MS,
					2, // DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
					DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
			
			// Access the RequestQueue through your singleton class.
			VolleyRequestQueue.getInstance(mContext).addToRequestQueue(jsonObjectRequest);
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	public interface LoginListener {
		void onSuccessfulLogin(JSONObject response);
		
		void onSuccessfulRegister(JSONObject response);
		
		void onLoginError(VolleyError error);
		
		void onRegisterError(VolleyError error);
	}
}
