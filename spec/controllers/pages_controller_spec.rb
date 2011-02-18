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

    it "should have only the tcias breadcrumb" do
      get 'home'
      response.should_not have_selector("li.breadcrumb",
                        :content => "portfolio")
      response.should_not have_selector("li.breadcrumb",
                        :content => "cv")
    end

    it "should not have jquery" do
      get 'home'
      response.should_not have_selector("script",
                        :src => "javascripts/jquery-1.5.min.js")
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

    it "should have the right breadcrumb" do
      get 'portfolio'
      response.should have_selector("li.breadcrumb",
                        :content => "portfolio")
    end

    it "should have jquery" do
      get 'portfolio'
      response.should have_selector("script",
                        :src => "javascripts/jquery-1.5.min.js")
    end

    it "should have orbit" do
      get 'portfolio'
      response.should have_selector("script",
                        :src => "javascripts/jquery.orbit.min.js")
    end

    it "should have reveal" do
      get 'portfolio'
      response.should have_selector("script",
                        :src => "javascripts/jquery.reveal.js")
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

    it "should have the right breadcrumb" do
      get 'cv'
      response.should have_selector("li.breadcrumb",
                        :content => "cv")
    end
  end

end
