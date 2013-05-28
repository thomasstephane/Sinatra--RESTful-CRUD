get '/' do
  @notes = Note.all
  erb :index
end

post '/note' do
  p params
  @note = Note.create(note: params[:text])
  content_type :json
  @note.to_json
end

delete '/note/:id' do |id|
  Note.destroy(id)
  content_type :json
  {msg: "message destroyed"}.to_json
end

put '/note/:id' do |id|
  @note = Note.find(id)
  @note.note = params[:text]
  @note.save
  content_type :json
  @note.to_json
end




