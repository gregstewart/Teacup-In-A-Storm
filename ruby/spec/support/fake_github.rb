require 'sinatra/base'

class FakeGithub < Sinatra::Base
  get '/users/gregstewart/events/public' do
    json_response 200, 'github.json'
  end

  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
  end
end