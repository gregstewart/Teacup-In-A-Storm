require 'sinatra/base'

class FakeInstagram < Sinatra::Base
  get '/v1/users/178138400/media/recent.json' do
    json_response 200, 'instagram.json'
  end

  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
  end
end