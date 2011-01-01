require 'spec_helper'

describe PagesController do
  render_views

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end

    it "should have the right title" do
      get 'home'
      response.should have_selector("title",
                        :content => "TCIAS | home")
    end
  end

  describe "GET 'portfolio'" do
    it "should be successful" do
      get 'portfolio'
      response.should be_success
    end

    it "should have the right title" do
      get 'portfolio'
      response.should have_selector("title",
                        :content => "TCIAS | portfolio")
    end
  end

  describe "GET 'cv'" do
    it "should be successful" do
      get 'cv'
      response.should be_success
    end

    it "should have the right title" do
      get 'cv'
      response.should have_selector("title",
                        :content => "TCIAS | cv")
    end
  end

end
