import {Injectable} from '@angular/core';
import {IIcon} from '../interfaces/i-icon';

@Injectable()
export class IconSearchService {
  public find(partialName: string): IIcon|undefined {
    return iconMap.find(i => i.displayName === partialName);
  }

  public searchNLimited(partialName: string, limit: number): Array<IIcon> {
    const testedName = new RegExp(partialName.trim(), 'i');

    return iconMap
      .filter(i => testedName.test(i.displayName))
      .filter(i => i.displayName !== partialName.trim())
      .slice(0, limit);
  }

  public getAllIcons(): Array<IIcon> {
    return iconMap;
  }
}

const iconMap: Array<IIcon> = [
  {
    class: 'sj-icon-adobe',
    displayName: 'Adobe'
  },
  {
    class: 'sj-icon-adobe-dreamweaver',
    displayName: 'Adobe Dreamweaver'
  },
  {
    class: 'sj-icon-adobe-photoshop',
    displayName: 'Adobe Photoshop'
  },
  {
    class: 'sj-icon-amazon-aws',
    displayName: 'Amazon AWS'
  },
  {
    class: 'sj-icon-c-plusplus',
    displayName: 'C++'
  },
  {
    class: 'sj-icon-c-sharp',
    displayName: 'C#'
  },
  {
    class: 'sj-icon-cisco',
    displayName: 'Cisco'
  },
  {
    class: 'sj-icon-citrix',
    displayName: 'Citrix'
  },
  {
    class: 'sj-icon-codeigniter',
    displayName: 'Codeigniter'
  },
  {
    class: 'sj-icon-craftcms',
    displayName: 'Craft CMS'
  },
  {
    class: 'sj-icon-css',
    displayName: 'CSS'
  },
  {
    class: 'sj-icon-css3',
    displayName: 'CSS3'
  },
  {
    class: 'sj-icon-disqus',
    displayName: 'Disqus'
  },
  {
    class: 'sj-icon-docker',
    displayName: 'Docker'
  },
  {
    class: 'sj-icon-dropbox',
    displayName: 'Dropbox'
  },
  {
    class: 'sj-icon-drupal',
    displayName: 'Drupal'
  },
  {
    class: 'sj-icon-facebook',
    displayName: 'Facebook'
  },
  {
    class: 'sj-icon-git',
    displayName: 'Git'
  },
  {
    class: 'sj-icon-github',
    displayName: 'GitHub'
  },
  {
    class: 'sj-icon-gitlab',
    displayName: 'GitLab'
  },
  {
    class: 'sj-icon-gnome',
    displayName: 'GNOME'
  },
  {
    class: 'sj-icon-gnubash',
    displayName: 'Bash'
  },
  {
    class: 'sj-icon-google-chrome',
    displayName: 'Google Chrome'
  },
  {
    class: 'sj-icon-html5',
    displayName: 'HTML5'
  },
  {
    class: 'sj-icon-npm',
    displayName: 'npm'
  },
  {
    class: 'sj-icon-opengl',
    displayName: 'OpenGL'
  },
  {
    class: 'sj-icon-opensuse',
    displayName: 'openSUSE'
  },
  {
    class: 'sj-icon-php',
    displayName: 'PHP'
  },
  {
    class: 'sj-icon-plesk',
    displayName: 'Plesk'
  },
  {
    class: 'sj-icon-postgresql',
    displayName: 'PostgreSQL'
  },
  {
    class: 'sj-icon-python',
    displayName: 'Python'
  },
  {
    class: 'sj-icon-pytorch',
    displayName: 'PyTorch'
  },
  {
    class: 'sj-icon-pyup',
    displayName: 'PyUp'
  },
  {
    class: 'sj-icon-qt',
    displayName: 'Qt'
  },
  {
    class: 'sj-icon-rancher',
    displayName: 'Rancher'
  },
  {
    class: 'sj-icon-raspberry-pi',
    displayName: 'Raspberry Pi'
  },
  {
    class: 'sj-icon-react',
    displayName: 'React'
  },
  {
    class: 'sj-icon-redhat',
    displayName: 'Redhat'
  },
  {
    class: 'sj-icon-redux',
    displayName: 'Redux'
  },
  {
    class: 'sj-icon-ruby-gems',
    displayName: 'Ruby Gems'
  },
  {
    class: 'sj-icon-rubyonrails',
    displayName: 'Ruby on Rails'
  },
  {
    class: 'sj-icon-sap',
    displayName: 'SAP'
  },
  {
    class: 'sj-icon-splunk',
    displayName: 'Splunk'
  },
  {
    class: 'sj-icon-superuser',
    displayName: 'Superuser'
  },
  {
    class: 'sj-icon-swagger',
    displayName: 'Wwagger'
  },
  {
    class: 'sj-icon-swarm',
    displayName: 'Wwarm'
  },
  {
    class: 'sj-icon-symfony',
    displayName: 'Symfony'
  },
  {
    class: 'sj-icon-typescript',
    displayName: 'TypeScript'
  },
  {
    class: 'sj-icon-unity',
    displayName: 'Unity'
  },
  {
    class: 'sj-icon-unreal-engine',
    displayName: 'Unreal Engine'
  },
  {
    class: 'sj-icon-vim',
    displayName: 'vim'
  },
  {
    class: 'sj-icon-visual-studio',
    displayName: 'Visual Studio'
  },
  {
    class: 'sj-icon-visual-studio-code',
    displayName: 'Visual Studio Code'
  },
  {
    class: 'sj-icon-vmware',
    displayName: 'VmWare'
  },
  {
    class: 'sj-icon-w3c',
    displayName: 'W3C'
  },
  {
    class: 'sj-icon-webgl',
    displayName: 'WebGL'
  },
  {
    class: 'sj-icon-webstorm',
    displayName: 'WebStorm'
  },
  {
    class: 'sj-icon-windows',
    displayName: 'Windows'
  },
  {
    class: 'sj-icon-wordpress',
    displayName: 'Wordpress'
  }
];
