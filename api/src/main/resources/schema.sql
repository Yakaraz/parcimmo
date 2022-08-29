create table ti_dico_answer_state (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_dico_answer_yesno (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_dico_progress (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_dico_property_type (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_dico_rentable (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_dico_visit_status (code varchar(255) not null, value varchar(255), primary key (code));
create table ti_property (property_id bigint auto_increment, property_postalcode varchar(255), property_street varchar(255), property_street2 varchar(255), property_city varchar(255), property_building_code varchar(255), property_property_code varchar(255), property_unit_code varchar(255), property_electric_delivery_point varchar(255), property_occupancy varchar(255), property_gaz_delivery_point varchar(255), property_identifiant varchar(255), property_room_number integer, property_cite varchar(255), property_scheduled_planified_at date, property_scheduled_visit_at date, property_scheduled_visit_status varchar(255), property_surface decimal(13,2), property_type varchar(255), primary key (property_id));
create table ti_property_team (property_id bigint not null, team_id bigint not null);
create table ti_property_user (property_id bigint not null, user_id bigint not null);
create table ti_team (team_id bigint auto_increment, team_code varchar(255), team_enabled boolean, team_name varchar(255), primary key (team_id));
create table ti_user (user_id bigint auto_increment, user_email varchar(255), user_enabled boolean, user_firstname varchar(255), user_fullname varchar(255), user_lastname varchar(255), user_password varchar(255), user_refreshtoken varchar(255), user_refreshtoken_createdat date, user_token varchar(255), user_username varchar(255), primary key (user_id));
create table ti_roles (role_id bigint auto_increment, role_name varchar(20), primary key (role_id));
create table ti_user_roles (user_id bigint not null, role_id bigint not null, primary key (user_id, role_id));
create table ti_mandator (mandator_id bigint auto_increment, mandator_postalcode varchar(255), mandator_street varchar(255), mandator_street2 varchar(255), mandator_city varchar(255), mandator_email varchar(255), mandator_mobile_phone_number varchar(255), mandator_name varchar(255), mandator_office_phone_number varchar(255), mandator_phone_number varchar(255), primary key (mandator_id));
create table ti_comment (comment_id bigint auto_increment, comment_created_at date, comment_text varchar(255), comment_user_id bigint, comment_control_id bigint, primary key (comment_id));
create table ti_control (control_id bigint auto_increment, control_status varchar(255), control_answer varchar(255), control_intervention_point_id bigint, control_visit_id bigint, primary key (control_id));
create table ti_intervention_point (intervention_point_id bigint auto_increment, intervention_point_answertype varchar(255), intervention_point_label varchar(255), intervention_point_position integer, intervention_point_section_id bigint, primary key (intervention_point_id));
create table ti_section (section_id bigint auto_increment, section_generic boolean, section_name varchar(255), primary key (section_id));
create table ti_visit (visit_id bigint auto_increment, visit_created_at date, visit_rentable varchar(255), visit_work_to_be_planned varchar(255), visit_property_id bigint, visit_user_id bigint, primary key (visit_id));


create table ti_user_team (user_id bigint not null, team_id bigint not null);

alter table ti_property_team add constraint fk_roperty_team_team_id foreign key (team_id) references ti_team(team_id);
alter table ti_property_team add constraint fk_roperty_team_property_id foreign key (property_id) references ti_property(property_id);
alter table ti_property_user add constraint fk_property_user_user_id foreign key (user_id) references ti_user(user_id);
alter table ti_property_user add constraint fk_property_user_property_id foreign key (property_id) references ti_property(property_id);

alter table ti_user_team add constraint fk_userteam_team_id foreign key (team_id) references ti_team(team_id);
alter table ti_user_team add constraint fk_userteam_user_id foreign key (user_id) references ti_user(user_id);

alter table ti_user_roles add constraint fk_user_roles_role_id foreign key (role_id) references ti_roles(role_id);
alter table ti_user_roles add constraint fk_user_roles_user_id foreign key (user_id) references ti_user(user_id);


alter table ti_comment add constraint fk_comment_control_id foreign key (comment_control_id) references ti_control(control_id);
alter table ti_comment add constraint fk_comment_user_id foreign key (comment_user_id) references ti_user(user_id);
alter table ti_control add constraint fk_control_intervention_point_id foreign key (control_intervention_point_id) references ti_intervention_point(intervention_point_id);
alter table ti_control add constraint fk_control_visit_id foreign key (control_visit_id) references ti_visit(visit_id);
alter table ti_intervention_point add constraint fk_intervention_point_section_id foreign key (intervention_point_section_id) references ti_section(section_id);
alter table ti_visit add constraint fk_visit_property_id foreign key (visit_property_id) references ti_property(property_id);
alter table ti_visit add constraint fk_visit_user_id foreign key (visit_user_id) references ti_user(user_id);