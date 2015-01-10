require 'sinatra/base'

class FakeTwitter < Sinatra::Base
  get '/1.1/statuses/user_timeline.json' do
    json_response 200, 'twitter.json'
  end

  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    File.open(File.dirname(__FILE__) + '/fixtures/' + file_name, 'rb').read
  end
end