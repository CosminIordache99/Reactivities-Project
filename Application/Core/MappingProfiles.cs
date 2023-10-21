using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, option => option.MapFrom(source => source.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            //we need to create a new map bcs "Missing type map conf or unsupported mapping error in postman"
            //Mapping types:ActivityAttendee -> Profiles
            CreateMap<ActivityAttendee, AttendeeDto> ()
                .ForMember(d => d.DisplayName, option => option.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(d => d.Username, option => option.MapFrom(source => source.AppUser.UserName))
                .ForMember(d => d.Bio, option => option.MapFrom(source => source.AppUser.Bio))
                .ForMember(d => d.Image, option => option.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profile> ()
                .ForMember(d => d.Image, option => option.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}