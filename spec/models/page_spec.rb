require 'spec_helper'

describe 'Page' do

  it 'should sort a collection of items by date in descending order' do
    page = Page.new
    items = page.items
    items.push(page.set_page_item('type', DateTime.new(2013,7,12), 'some text 1', 'some url', 'some thumbnail'))
    items.push(page.set_page_item('type', DateTime.new(2013,8,23), 'some text 2', 'some url', 'some thumbnail'))
    items.push(page.set_page_item('type', DateTime.new(2013,8,01), 'some text 3', 'some url', 'some thumbnail'))

    page.sort_by_date
    #To change this template use File | Settings | File Templates.
    items[0][:content].should == 'some text 2'
    items[1][:content].should == 'some text 3'
    items[2][:content].should == 'some text 1'
  end
end