require 'sinatra/base'

class FakeFoursquare < Sinatra::Base
  get '/v2/users/self/checkins' do
    json_response 200, 'foursquare.json'
  end

  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
  end
end