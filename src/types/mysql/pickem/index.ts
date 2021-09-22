export interface PickemTeamsTable {
	id?: string;
	name?: string;
	city?: string;
	conference?: string;
	division?: string;
	full_name?: string;
	primary_color?: string;
	secondary_color?: string;
	tertiary_color?: string;
	quatenary_color?: string;
	wiki_logo_url?: string;
	stadium_name?: string;
}

export interface PickemSeasonsTable {
	id?: string;
	num?: number;
}

export interface PickemWeeksTable {
	id?: string;
	num?: number;
	start_time?: Date;
	end_time?: Date;
}

export interface PickemPicksTable {
	id?: string;
	home_team_id?: string;
	away_team_id?: string;
	week_id?: string;
	season_id?: string;
	start_time?: Date;
}

export interface PickemPicksTable {
	id?: string;
	user_id?: string;
	team_id?: string;
	week_id?: string;
	season_id?: string;
	created_at?: Date;
	modified_at?: Date;
}
