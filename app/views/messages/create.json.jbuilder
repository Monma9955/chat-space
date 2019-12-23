json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %T")
json.message @message.message
json.image @message.image_url