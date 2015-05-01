app.plugin.Plugin_bike = app.Plugin.extend({
	
	name: "Plugin_bike",
	type: "bike",
	copyright: '<a href="http://cloudmade.com/">Cloudmade</a>',
	
	options: {
		style: {
			weight: 5,
			dashArray: "5,15"
		},
		bikeKcalPerHour: 600,
		key: "651bbaa7f5cf4426aa481bdc794cbf4d"
	},
	
	energyFromTime: function(tableData, sec) {
		var kcalPerHour = this.options.bikeKcalPerHour;
		tableData.kcalYear = sec / 60 / 60 * kcalPerHour * app.Plugin.options.tripsPerYear;    //kcal per year
		tableData.kgChok = tableData.kcalYear / 5600; // kg per year
	},
	
	calculate: function(startLatLng, endLatLng, callbacks, options) {
		var onSuccess = callbacks.onSuccess, // required
		// Optional arguments
			onError = callbacks.onError || function() {},
			onComplete = callbacks.onComplete || function() {};
		options = options || {};

		var deferred = $.Deferred(),
			self = this,
			url = "http://routes.cloudmade.com/"+this.options.key+"/api/0.3/" + startLatLng.lat + "," + startLatLng.lng + "," + endLatLng.lat + "," + endLatLng.lng + "/foot.js?units=km";

		$.ajax({
			url: app.ws.proxy ? app.ws.proxy + encodeURIComponent(url) : url,
			type: "GET",
			dataType: "json",
			context: this,
			success: function(resp) {
				var latLngArr = $.map(resp.route_geometry, function(val) {
					return L.latLng(val[0], val[1]);
				});
				var tableData = app.Plugin.getTypeResult();
				
				var t = resp.route_summary;
				tableData.distance = t.total_distance;
				tableData.time = tableData.distance / 1000 / app.Plugin.options.bikeSpeed * 60 * 60;
//				tableData.time = Math.round(t.total_time);
                tableData.distance = t.total_distance;
                tableData.costPerTrip = 0.97 * (tableData.distance/10000);
                tableData.costPerYear = tableData.costPerTrip * 365;
                tableData.co2PerTrip = 0;
                tableData.co2PerYear = 0;
                this.energyFromTime(tableData, tableData.time);
				
				var lineDict = {"bike": latLngArr};
				deferred.resolve(lineDict, tableData, self);
			}
		}).fail(onError).always(onComplete);
		
		
		deferred.done(onSuccess);
		onComplete();
		
		
	}
	
});