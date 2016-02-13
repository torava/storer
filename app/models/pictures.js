const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  	name: String,
  	message: String,
  	date_added: {type: Date, default: Date.now }
});

const picturesSchema = new Schema({
  	filename: String,
  	date_added: {type: Date, default: Date.now },
  	mimetype: String,
  	original_name: String,
  	comments: [commentsSchema]
});

picturesSchema.methods = {
	addComment: function(body) {
		this.comments.unshift({
			message: body.message,
			name: body.name
		});
		return this.save();
	}
}

mongoose.model('Picture', picturesSchema);
