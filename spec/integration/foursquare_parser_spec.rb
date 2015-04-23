require 'spec_helper'

describe 'Foursquare Parser' do

  it 'should return 10 items from Foursquare' do
    foursquare_client = FoursquareParser.new

    foursquare_items = foursquare_client.get_last_user_events(10)

    foursquare_items.size.should == 10
  end
end