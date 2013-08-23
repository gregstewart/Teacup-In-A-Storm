require 'spec_helper'

describe PagesController do
  render_views

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end

    describe "check content" do
      before(:each) do
        visit root_path
      end

      it "should have the right title" do
        page.should have_selector("title",
                                      :content => "TCIAS | Home")
      end

      it "should have only the tcias breadcrumb" do
        page.should_not have_selector("li.breadcrumb",
                                          :text => "portfolio")
        page.should_not have_selector("li.breadcrumb",
                                          :text => "cv")
      end

      it "should have google analytics" do
        page.should have_selector("script",
                                      :content => "_gaq")
      end

      it "should have 5 delicious links" do
        matching = page.all('li.delicious')
        matching.size.should be(5)
      end

      it "should have 10 blog post links" do
        matching = page.all('li.blog')
        matching.size.should be(10)
      end

      it "should have 2 vimeo links" do
        matching = page.all('li.vimeo')
        matching.size.should be(2)
      end

      it "should have 5 twitter links" do
        matching = page.all('li.twitter')
        matching.size.should be(5)
      end

      it "should have 6 instagram links" do
        matching = page.all('li.instagram')
        matching.size.should be(6)
      end

      it "should have 5 github links" do
        matching = page.all('li.github')
        matching.size.should be(5)
      end

      it "should have 10 foursquare links" do
        matching = page.all('li.foursquare')
        matching.size.should be(10)
      end
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

  describe "GET 'timeline'" do
    it "should be successful" do
      get 'timeline'
      response.should be_success
    end
  end
end