dbConnect() = Helps to call database connection

multer = Helps to configure our expert server to accept file upload.

{ $regex: name, $options: "i" } = Compares to data no matter it is upper or lowercase

.toFixed("1") = Sets only one decimal value after point Eg 4.5

\_id: { $in: orderItems } = Using $in opearator we can to find \_id in **array** orderItems , rather than loop through each object.

Virtuals = It is the properties that does not persist on record inside our database,but upon querying we can have that upon model.

.populate() = Gives full Object of reference model which is helpfull in calling that particular key of that reference model.
populate() method is used to replace the user ObjectId field with the whole document consisting of all the user data

WebHook :- When user place an order it can happen that the user payment can rejected or accepted.The rejection can come in when user have enough balance. So at this point user has place order without re-payment

<!-- Errors Types : -->

If not use await keyword as prefix of models in Ctrls :-
Eg. const color = <!-- await Color.findByIdAndUpdate(req.params.id, { name }, { new: true }); -->

Error :-
TypeError: Converting circular structure to JSON\n
