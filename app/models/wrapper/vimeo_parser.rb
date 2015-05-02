class VimeoParser
  require('date_wrapper')

  def initialize
    @client = Vimeo::Simple::User
    @type = :vimeo
  end

  def get_last_user_events number_of_items
    vimeo_feed = @client.videos(APP_CONFIG['vimeo']['user_id'])
    format vimeo_feed[0..number_of_items]
  end

  def format vimeo_feed
    vimeo_feed.map do |item|
      PageItem.new(@type, DateWrapper.fix_date(item['upload_date']), item['title'], item['url'], item['thumbnail_large'], nil)
    end
  end
end