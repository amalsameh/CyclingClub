/* Defines the product entity */
export interface IEvent {
  _id: {Owner: String, dueDate: Date};
  title: string;
  location: {long: Number, lat: Number};
  status: String;
  miles: Number;
  startPoint: String;
  endPoint: String;
  notification: {text: String, status: Boolean};
  club: {_id: String;
          city: String;
          state: String;
          picture: String;
          members: [{_id: String}];
          location: {long: Number, lat: Number}};
  members: [{_id: String;
              name: String}];
}

