require 'spec_helper'

describe PagesController do
  render_views

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end

    it "should have the right title" do
      visit root_path
      page.should have_selector("title",
                                    :content => "TCIAS | Home")
    end

    it "should have only the tcias breadcrumb" do
      visit root_path
      page.should_not have_selector("li.breadcrumb",
                                        :text => "portfolio")
      page.should_not have_selector("li.breadcrumb",
                                        :text => "cv")
    end

    it "should have google analytics" do
      visit root_path
      page.should have_selector("script",
                                    :content => "_gaq")
    end
  end

  describe "GET 'portfolio'" do
    it "should be successful" do
      get 'portfolio'
      response.should be_success
    end

    it "should have the right title" do
      visit portfolio_path
      page.should have_selector("title",
                                    :content => "TCIAS | Portfolio")
    end

    it "should have the right breadcrumb" do
      visit portfolio_path

      page.should have_selector("li.breadcrumb",
                                    :text => "portfolio")
    end

  end

  describe "GET 'cv'" do
    it "should be successful" do
      get 'cv'
      response.should be_success
    end

    it "should have the right title" do
      visit cv_path

      page.should have_selector("title",
                                    :content => "TCIAS | Curriculum Vitae")
    end

    it "should have the right breadcrumb" do
      visit cv_path

      page.should have_selector("li.breadcrumb",
                                    :text => "cv")
    end
  end

end