using System.Collections.Generic;

namespace Application.Activities
{
    public class ActivityDto // this was create to resolve the object cycle, when EF try to load data
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category {get; set;}
        public string City { get; set; }
        public string Venue {get; set;}
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<AttendeeDto> Attendees { get; set; }     
    }
}