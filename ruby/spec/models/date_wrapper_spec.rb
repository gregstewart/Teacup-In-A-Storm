require 'spec_helper'

describe 'DateWrapper' do

  it 'when nil dates are encountered should set a default date value' do

    date = DateWrapper.fix_date(nil)

    expect date.should be_a(DateTime)
  end

  it 'handles foursquare timestamps' do
    date = DateWrapper.fix_date(1420643491)

    expect date.should be_a(DateTime)
  end

  it 'handles instagram timestamps' do
    date = DateWrapper.fix_date(1420050783)

    expect date.should be_a(DateTime)
  end
end
