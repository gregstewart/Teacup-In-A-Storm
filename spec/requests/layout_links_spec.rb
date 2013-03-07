require 'spec_helper'

describe "LayoutLinks" do
  it "should have a homepage at '/'" do
    visit root_path

    page.should have_selector "title",  text: full_title('Home')
  end
end