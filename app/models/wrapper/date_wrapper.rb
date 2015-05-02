module DateWrapper
  def self.fix_date(date)
    return DateTime.new if date.nil?

    begin
      DateTime.parse(date.to_s)
    rescue
      DateTime.parse(Time.at(date.to_i).to_s)
    end
  end
end