class VimeoParser
  def initialize
    @client = Vimeo::Simple::User
  end

  def get_last_user_events number_of_items
    vimeo_feed = @client.videos("user2724002")
    format vimeo_feed[0..number_of_items]
  end

  def format vimeo_feed
    # upload_date (date), title (content), url (url), thumbnail_large (thumbnail)
    items = []
    vimeo_feed.each do |item|
      vimeo_item = {date: item['upload_date'], content: item['title'],
                      url: item['url'], thumbnail: item['thumbnail_large'], location: nil}
      items.push(vimeo_item)
    end

    items
  end
end