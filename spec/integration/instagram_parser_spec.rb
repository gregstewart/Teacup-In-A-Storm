require 'spec_helper'

describe 'Instagram Parser' do

  it 'should return 10 items from Instagram' do
    instagram_client = Instagram.new

    instagram_items = instagram_client.get_last_user_events(10)

    instagram_items.size.should == 10
  end
end