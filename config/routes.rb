Rails.application.routes.draw do
  root 'top#index'
  get 'top/document_time_zone', to: "top#document_time_zone"
end
