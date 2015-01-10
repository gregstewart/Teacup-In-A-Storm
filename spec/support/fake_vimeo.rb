require 'sinatra/base'

class FakeVimeo < Sinatra::Base
  get '/api/v2/user2724002/videos.json' do
    json_response 200, 'vimeo.json'
  end

  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
  end
end