require 'spec_helper'

describe 'Github Parser' do

  it 'should return 10 items from Foursquare' do
    github_client = Github.new

    github_items = github_client.get_last_user_events(10)

    github_items.size.should == 10
  end

end