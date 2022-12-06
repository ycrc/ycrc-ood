def processAdvancedOptions(advanced_job_options)
  options = Hash.new
  advanced_job_options.strip().each_line do |option|
    option.squeeze(" ")
    if option.include? "=" then
        option_split = option.split("=", 2)
        options[option_split[0].strip()] = option_split[1].strip().tr('"', '').tr("'", "")
    elsif option.include? " " then
        option_split = option.split(" ", 2)
        options[option_split[0].strip()] = option_split[1].strip().tr('"', '').tr("'", "")
    end 
  end
  return options
end
