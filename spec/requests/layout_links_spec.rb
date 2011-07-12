require 'spec_helper'

describe "LayoutLinks" do
  it "should have a homepage at '/'" do
    get "/"
    response.should(have_selector("title", :content => "home"))
  end

  it "should have a portfolio page at '/portfolio'" do
    get "/portfolio"
    response.should(have_selector("title", :content => "portfolio"))
  end

  it "should have a cv page at '/cv'" do
    get "/cv"
    response.should(have_selector("title", :content => "cv"))
  end
end
