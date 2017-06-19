package com.example.quocsyluong.volleyapp.service;

import android.content.Context;

import com.android.volley.Cache;
import com.android.volley.Network;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.DiskBasedCache;
import com.android.volley.toolbox.HurlStack;

public class VolleyRequestQueue {
	
	private static VolleyRequestQueue mInstance;
	private static Context mContext;
	private RequestQueue mRequestQueue;
	
	private VolleyRequestQueue(Context context) {
		this.mContext = context;
		this.mRequestQueue = getRequestQueue();
	}
	
	public static synchronized VolleyRequestQueue getInstance(Context context) {
		if(mContext == null) {
			mInstance = new VolleyRequestQueue(context);
		}
		return mInstance;
	}
	
	public RequestQueue getRequestQueue() {
		if(mRequestQueue == null) {
			Cache cache = new DiskBasedCache(mContext.getCacheDir(), 10 * 1024 * 1024);
			Network network = new BasicNetwork(new HurlStack());
			mRequestQueue = new RequestQueue(cache, network);
			mRequestQueue.start();
		}
		return mRequestQueue;
	}
	
	public <T> void addToRequestQueue(Request<T> req) {
		getRequestQueue().add(req);
	}
}
