class WrapperFactory

  def build (type)
    begin
      Object::const_get(type + "Parser").new
    rescue
      raise 'Unknown parser requested: ' + type
    end
  end

end