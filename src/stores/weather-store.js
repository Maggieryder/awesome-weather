import API from '../api/api-weather'
import Reflux from 'reflux'
import Actions from '../actions/actions'

export default Reflux.createStore({
  listenables: [Actions],
  handleSearch: function(id){
    console.log("GET WEATHER :", location);
    API.getWeather(location)
      .then(function(json){
        //console.log("GET USER RESPONSE :", json);
        this.weather = json;
        // refresh USER!!
        this.triggerUpdate();
      }.bind(this));
  },
  // refresh data
  triggerUpdate: function(){
    this.trigger('change', this.weather);
  }
})
