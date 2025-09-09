import { createClient } from '@supabase/supabase-js';

// Use environment variables with proper fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjU0MjM4MCwiZXhwIjoxOTU4MTE4MzgwfQ.demo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          date_of_birth: string | null;
          gender: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trains: {
        Row: {
          id: string;
          train_number: string;
          train_name: string;
          source_station: string;
          destination_station: string;
          departure_time: string;
          arrival_time: string;
          duration: string;
          days_running: string[];
          total_seats: number;
          available_seats: number;
          price_sleeper: number;
          price_3ac: number;
          price_2ac: number;
          price_1ac: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          train_number: string;
          train_name: string;
          source_station: string;
          destination_station: string;
          departure_time: string;
          arrival_time: string;
          duration: string;
          days_running: string[];
          total_seats: number;
          available_seats: number;
          price_sleeper: number;
          price_3ac: number;
          price_2ac: number;
          price_1ac: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          train_number?: string;
          train_name?: string;
          source_station?: string;
          destination_station?: string;
          departure_time?: string;
          arrival_time?: string;
          duration?: string;
          days_running?: string[];
          total_seats?: number;
          available_seats?: number;
          price_sleeper?: number;
          price_3ac?: number;
          price_2ac?: number;
          price_1ac?: number;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          train_id: string;
          booking_date: string;
          journey_date: string;
          passenger_count: number;
          seat_class: string;
          total_amount: number;
          booking_status: string;
          pnr_number: string;
          passenger_details: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          train_id: string;
          booking_date?: string;
          journey_date: string;
          passenger_count: number;
          seat_class: string;
          total_amount: number;
          booking_status?: string;
          pnr_number: string;
          passenger_details: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          train_id?: string;
          booking_date?: string;
          journey_date?: string;
          passenger_count?: number;
          seat_class?: string;
          total_amount?: number;
          booking_status?: string;
          pnr_number?: string;
          passenger_details?: any;
          created_at?: string;
        };
      };
      stations: {
        Row: {
          id: string;
          station_code: string;
          station_name: string;
          city: string;
          state: string;
          zone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          station_code: string;
          station_name: string;
          city: string;
          state: string;
          zone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          station_code?: string;
          station_name?: string;
          city?: string;
          state?: string;
          zone?: string;
          created_at?: string;
        };
      };
    };
  };
};