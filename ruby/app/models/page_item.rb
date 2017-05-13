class PageItem
  attr_accessor :type, :date, :content, :url, :thumbnail, :location

  def initialize(type, date, content, url, thumbnail, location)
    @type = type
    @date = date
    @content = content
    @url = url
    @thumbnail = thumbnail
    @location = location
  end
end