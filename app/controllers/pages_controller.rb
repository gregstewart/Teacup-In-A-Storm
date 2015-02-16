class PagesController < ApplicationController

  caches_page :home, :timeline

  def home
    @title = "home"

    @page = Page.new
    @page.fetch_page_items(feed_configurations)

    respond_to do |format|
      format.html
    end

  end

  def timeline
    @title = "timeline"

    @page = Page.new
    @page.fetch_sorted_page_items(feed_configurations)

    respond_to do |format|
      format.html
      format.json
    end

  end

  def portfolio
    @title = "portfolio"
    respond_to do |format|
      format.html
    end
  end

  def cv
    @title = "cv"
    respond_to do |format|
      format.html
    end
  end

  private
  def feed_configurations
    { wordpress: {count: 10}, delicious: {count: 5}, instagram: {count: 6}, github: {count: 5},
      twitter: {count: 4}, vimeo: {count: 1}, foursquare: {count: 10} }
  end

end
