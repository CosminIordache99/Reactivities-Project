using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, option => option.MapFrom(source => source.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}