class PageItem
  attr_accessor :type, :date, :content, :url, :thumbnail, :location

  def initialize(type, date, content, url, thumbnail, location)
    @type = type
    @date = fix_date(date, type)
    @content = content
    @url = url
    @thumbnail = thumbnail
    @location = location
  end

  def fix_date(date, type)
    return DateTime.new if date.nil?

    (type == :instagram || type == :foursquare) ? DateTime.parse(Time.at(date.to_i).to_s) : DateTime.parse(date.to_s)
  end
end