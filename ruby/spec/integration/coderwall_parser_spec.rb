require 'spec_helper'

describe 'Coderwall Parser' do

  it 'should return 10 badges from Coder Wall' do
    coderwall_client = CoderwallParser.new

    coderwall_items = coderwall_client.get_last_user_events(10)

    coderwall_items.size.should == 10
  end
end