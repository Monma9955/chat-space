class MessagesController < ApplicationController
  before_action :set_group

  def index
  end

  def create
  private

  def message_params
    params.require(:message).permit(:message, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end